import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api/api";
import { type IUserCreate, userCreateResponseSchema } from "@/lib/schema/users";
import { toast } from "sonner";

async function createUser({ body }: { body: IUserCreate }) {
  const { data } = await api.post(`/users/register`, body);

  const parsedResponse = userCreateResponseSchema.safeParseAsync(data);

  if (!parsedResponse) {
    console.error(parsedResponse);
    throw new Error(parsedResponse);
  }

  return parsedResponse;
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
