import { Metadata } from "next";
import MyProfileContent from "./MyProfileContent";

export const metadata: Metadata = {
  title: "BookNook | My Profile",
  description: "View and manage your BookNook account profile.",
};

export default function Page() {
  return <MyProfileContent />;
}
