import { Suspense } from "react";
import Loading from "../../components/Loading";

export default function DetailsLayout({ children }) {
  return (
    <Suspense fallback={<Loading />}>
      {children}
    </Suspense>
  );
}