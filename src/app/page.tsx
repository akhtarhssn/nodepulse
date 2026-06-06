import LogOutButton from "@/components/LogOutButton";
import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";

const Home = async () => {
  await requireAuth();

  const data = await caller.getUsers();

  return (
    <main className="flex items-center justify-center min-h-screen">
      Protected content. Welcome, {data[0]?.email ?? "User"}!
      <br />
      <LogOutButton />
    </main>
  );
};

export default Home;
