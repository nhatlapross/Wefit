import ThreeDotIcon from "@/asset/icon/ThreeDotIcon";
import { Image } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User } from "@nextui-org/react";
import { useRouter } from "next/router";
import { signOut } from 'next-auth/react';

export default function Header() {
    const { data: session } = useSession() || {};
    const router = useRouter();
    const logOut = () => {
        // Sign out and redirect to home page
        signOut({ callbackUrl: '/' });  // Redirect to home page after logout
    }

    return (
        <div className="w-full flex justify-between items-center">
            {/* <div className="flex items-center gap-3">
                <Image
                    isZoomed
                    width={60}
                    radius="lg"
                    alt="NextUI Fruit Image with Zoom"
                    src={session?.user?.image ?? "/path/to/default/image.jpg"}
                />
                <span className="font-bold">{session?.user?.name}</span>
            </div>
            <button>
                <ThreeDotIcon />
            </button> */}
            <Dropdown placement="bottom-start">
                <DropdownTrigger>
                    <div className="flex items-center gap-3">
                        <Image
                            isZoomed
                            width={60}
                            radius="lg"
                            alt="NextUI Fruit Image with Zoom"
                            src={session?.user?.image ?? "/path/to/default/image.jpg"}
                        />
                        <span className="font-bold">{session?.user?.name}</span>
                    </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="User Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                        <p className="font-bold">Signed in as</p>
                        <p className="font-bold">{session?.user?.name}</p>
                    </DropdownItem>
                    <DropdownItem key="settings" onClick={() => router.push('/home')}>
                        Home
                    </DropdownItem>
                    <DropdownItem key="team_settings" onClick={() => router.push('/profile')}>Profile</DropdownItem>
                    <DropdownItem key="help_and_feedback" onClick={() => router.push('/policy')}>
                        Term and Service
                    </DropdownItem>
                    <DropdownItem key="logout" color="danger" onClick={() => logOut()}>
                        Log Out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}