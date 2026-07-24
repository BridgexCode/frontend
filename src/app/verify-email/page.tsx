import { VerifyEmailContent } from "./VerifyEmailContent";

type VerifyEmailPageProps = {
  searchParams?: Promise<{
    email?: string;
  }>;
};

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  const params = await searchParams;
  const email = params?.email || "sample@gmail.com";

  return <VerifyEmailContent email={email} />;
}
