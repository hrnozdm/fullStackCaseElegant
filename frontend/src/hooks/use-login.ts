import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, setAuthToken } from "@/lib/api/api";
import {
  type IUserLogin,
  userLoginResponseSchema,
  userLoginErrorResponseSchema,
} from "@/lib/schema/users";
import { toast } from "sonner";
import { useAuth } from "@/context/auth-context";

async function loginRequest({ body }: { body: IUserLogin }) {
  const { data } = await api.post(`/users/login`, body);

  const successParsed = userLoginResponseSchema.safeParseAsync(data);
  if (successParsed) {
    return successParsed;
  }

  const errorParsed = userLoginErrorResponseSchema.safeParse(data);
  if (errorParsed.success) {
    throw new Error(errorParsed.data.message);
  }

  throw new Error("Beklenmeyen response formatı");
}

export function useLogin() {
  const queryClient = useQueryClient();
  const { setUser, setUserToken } = useAuth();

  return useMutation({
    mutationFn: (params: { body: IUserLogin }) => loginRequest(params),
    onSuccess: (res) => {
      toast.success("Giriş yapıldı");
      if (res?.data?.data?.token) {
        setUserToken(res.data.data.token);
        setAuthToken(res.data.data.token);

        localStorage.setItem("user_info", JSON.stringify(res.data.data.user));
        setUser(res.data.data.user);
      }
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
