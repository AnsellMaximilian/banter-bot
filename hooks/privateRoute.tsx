import { useUser } from "@/contexts/user/UserContext";
import { useRouter } from "next/navigation";
import { ComponentType, useEffect } from "react";

const privateRoute = <P extends object>(
  WrappedComponent: ComponentType<P>
): ComponentType<P> => {
  const ComponentWithPrivateRoute = (props: P) => {
    const { isLoading, currentUser } = useUser();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !currentUser) {
        router.push("/register");
      }
    }, [isLoading, currentUser, router]);

    if (isLoading) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithPrivateRoute;
};

export default privateRoute;