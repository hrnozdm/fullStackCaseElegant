import { Filter, ObjectId, WithId } from "mongodb";
import { getCollection } from "@/database/db";
import { IPatient } from "@/models/patient.model";
import {
  CreatePatientDto,
  ListPatientsQueryDto,
  UpdatePatientDto,
} from "@/dto/patient.dto";

class PatientService {
  private get patients() {
    return getCollection<IPatient>("patients");
  }

  async create(data: CreatePatientDto) {
    const now = new Date();
    const newPatient: IPatient = {
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: new Date(data.dateOfBirth),
      gender: data.gender,
      phone: data.phone,
      email: data.email,
      address: data.address,
      medicalHistory: data.medicalHistory ?? undefined,
      createdAt: now,
      updatedAt: now,
    };

    const existingEmail = await this.patients.findOne({
      email: newPatient.email,
    });
    if (existingEmail) throw new Error("Patient email already exists");

    const result = await this.patients.insertOne(newPatient);
    newPatient._id = result.insertedId;
    return this.sanitize(newPatient);
  }

  async list(query: ListPatientsQueryDto) {
    const page = Math.max(parseInt(query.page || "1", 10) || 1, 1);
    const limit = Math.min(
      Math.max(parseInt(query.limit || "10", 10) || 10, 1),
      100
    );
    const skip = (page - 1) * limit;

    const filters: Filter<IPatient> = {};
    if (query.search && query.search.trim().length > 0) {
      filters.$or = [
        { firstName: { $regex: query.search, $options: "i" } },
        { lastName: { $regex: query.search, $options: "i" } },
        { email: { $regex: query.search, $options: "i" } },
        { phone: { $regex: query.search, $options: "i" } },
      ];
    }

    const sortField = query.sortBy || "createdAt";
    const sortOrder = (query.sortOrder || "desc") === "asc" ? 1 : -1;
    const sort: Record<string, 1 | -1> = { [sortField]: sortOrder };

    const [items, total] = await Promise.all([
      this.patients.find(filters).sort(sort).skip(skip).limit(limit).toArray(),
      this.patients.countDocuments(filters),
    ]);

    return {
      items: items.map(this.sanitize),
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getById(id: string) {
    if (!ObjectId.isValid(id)) throw new Error("Invalid patient id");
    const doc = await this.patients.findOne({ _id: new ObjectId(id) });
    if (!doc) throw new Error("Patient not found");
    return this.sanitize(doc);
  }

  async update(id: string, data: UpdatePatientDto) {
    if (!ObjectId.isValid(id)) throw new Error("Invalid patient id");
    const { dateOfBirth, ...rest } = data;
    const updates: Partial<IPatient> = { ...rest };
    if (dateOfBirth) updates.dateOfBirth = new Date(dateOfBirth);
    updates.updatedAt = new Date();

    const res = await this.patients.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updates },
      { returnDocument: "after" }
    );

    if (!res) throw new Error("Patient not found");
    return this.sanitize(res);
  }

  async remove(id: string) {
    if (!ObjectId.isValid(id)) throw new Error("Invalid patient id");
    const del = await this.patients.deleteOne({ _id: new ObjectId(id) });
    if (del.deletedCount === 0) throw new Error("Patient not found");
    return { message: "Patient deleted" };
  }

  private sanitize(doc: IPatient | WithId<IPatient>) {
    const { _id, ...rest } = doc;
    return { id: _id?.toString(), ...rest };
  }
}

export default new PatientService();
