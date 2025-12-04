// PrivateRoute.tsx

import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { RoutePath } from "../const/RoutePath";
import { useAuthStore } from "../store/useAuthStore";

interface PrivateRouteProps {
  children: ReactNode;
  role?: string;
}

function PrivateRoute({ children, role }: PrivateRouteProps) {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  if (!user || !token) {
    return <Navigate to={RoutePath.LOGIN} replace />;
  }

  if (role && role.length > 0) {
    const hasRole = role.includes(user.roleCode);
    if (!hasRole) {
      // 권한 없으면 -> 접근 불가/대시보드 등으로 보내기 > 추후 error page나 경고 팝업으로
      return <Navigate to={RoutePath.DASHBOARD} replace />;
    }
  }

  return <>{children}</>;
}

export default PrivateRoute;
