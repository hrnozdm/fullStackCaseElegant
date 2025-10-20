import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api/api";
import { type IUserCreate, userCreateResponseSchema } from "@/lib/schema/users";
import { toast } from "sonner";



async function createUser({ body }: { body: IUserCreate }) {
  const { data } = await api.post(`/users/register`, body);

  const parsedResponse = userCreateResponseSchema.safeParse(data);

  if (!parsedResponse.success) {
    console.error(parsedResponse.error);
    throw new Error(parsedResponse.error.message);
  }

  return parsedResponse.data;
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { body: IUserCreate }) => createUser(params),
    onSuccess: () => {
      toast.success("Kullanıcı oluşturma başarılı");
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}


