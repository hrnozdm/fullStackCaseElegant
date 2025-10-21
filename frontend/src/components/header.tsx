import type { FileRoutesByTo } from "@/routeTree.gen";
import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useUserInfo } from "@/hooks/use-user-info";
import { toast } from "sonner";

type NavigationLink = { to: keyof FileRoutesByTo; label: string };

const navigationLinks: NavigationLink[] = [
  { to: "/", label: "Ana Sayfa" },
  { to: "/patients", label: "Hastalar" },
  { to: "/login", label: "Giriş Yap" },
];

export function Header() {
  const { userInfo, logout } = useUserInfo();
  const navigate = useNavigate();

  const logOut = () => {
    logout();
    toast.success("Çıkış yapıldı");
    navigate({ to: "/login", replace: true });
  };

  return (
    <header style={{ padding: 20, background: "#eee" }}>
      <div className="flex justify-between items-center">
        <Link to="/">
          <h1>Hasta Takip Sistemi</h1>
        </Link>
        <div className="flex gap-8 items-center">
          {navigationLinks.map((link) => {
            // Hastalar linkini sadece giriş yapmış kullanıcılara göster
            if (link.to === "/patients" && !userInfo) {
              return null;
            }
            // Login linkini sadece giriş yapmamış kullanıcılara göster
            if (link.to === "/login" && userInfo) {
              return null;
            }
            return (
              <Link key={link.to} to={link.to}>
                {link.label}
              </Link>
            );
          })}
          {userInfo && (
            <div className="flex items-center gap-3 ml-4">
              <div className="text-sm">
                <span className="font-medium">{userInfo.name}</span>
                <span className="text-gray-600 ml-2">({userInfo.role})</span>
              </div>
              <Button onClick={logOut} variant="outline" size="sm">
                Çıkış Yap
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
