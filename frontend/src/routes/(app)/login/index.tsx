import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginSchema, type LoginFormData } from "@/lib/schema/auth";
import { useLogin } from "@/hooks/use-login";

export const Route = createFileRoute("/(app)/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { mutate: login, isPending: isLoading } = useLogin();

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setErrors({});

    try {
      const validatedData = loginSchema.parse(formData);
      login(
        { body: validatedData },
        {
          onSuccess: () => {
            navigate({ to: "/" });
          },
          onError: (err) => {
            setError(err.message);
          },
        }
      );
    } catch (err) {
      if (err instanceof Error && "issues" in err) {
        const zodErrors = err as any;
        const fieldErrors: Partial<LoginFormData> = {};
        zodErrors.issues.forEach((issue: any) => {
          fieldErrors[issue.path[0] as keyof LoginFormData] = issue.message;
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-8 transition-all">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Giriş Yap
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Hesabınıza giriş yapın
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email Adresi
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="ornek@email.com"
                className="focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Şifre
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Şifrenizi girin"
                className="focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 p-3 rounded-lg">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 font-semibold py-2 rounded-lg transition-all"
          >
            {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </Button>

          <div className="text-center pt-2">
            <Link
              to="/register"
              className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              Hesabınız yok mu? Kayıt Ol
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
