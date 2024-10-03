import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue } from "@nextui-org/react";
import { useSession } from 'next-auth/react';
export default function Leaderboard() {
    const { data: session } = useSession() || {};
    const columns = [
        { name: "NAME", uid: "name" },
        { name: "SCORE", uid: "role" },
        { name: "RANK", uid: "status" },
    ];

    const myRanking = [
        {
            id: 999,
            name: session?.user?.name,
            role: "1909 point",
            team: "500 km",
            status: "#100",
            age: "29",
            avatar: session?.user?.image,
            email: session?.user?.email,
        }
    ]

    const users = [
        {
            id: 1,
            name: "Tony Reichert",
            role: "98909 point",
            team: "5600 km",
            status: "#1",
            age: "29",
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            email: "tony.reichert@example.com",
        },
        {
            id: 2,
            name: "Zoey Lang",
            role: "87909 point",
            team: "5300 km",
            status: "#2",
            age: "25",
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
            email: "zoey.lang@example.com",
        },
        {
            id: 3,
            name: "Jane Fisher",
            role: "67909 point",
            team: "4200 km",
            status: "#3",
            age: "22",
            avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            email: "jane.fisher@example.com",
        },
        {
            id: 4,
            name: "William Howard",
            role: "57209 point",
            team: "3200 km",
            status: "#4",
            age: "28",
            avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
            email: "william.howard@example.com",
        },
        {
            id: 5,
            name: "Kristen Copper",
            role: "27909 point",
            team: "1200 km",
            status: "#5",
            age: "24",
            avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
            email: "kristen.cooper@example.com",
        },
    ];

    const renderCell = React.useCallback((user: any, columnKey: any) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "name":
                return (
                    <User
                        avatarProps={{ radius: "lg", src: user.avatar }}
                        description={user.email}
                        name={cellValue}
                    >
                        {user.email}
                    </User>
                );
            case "role":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                        <p className="text-bold text-sm capitalize text-default-400">{user.team}</p>
                    </div>
                );
            case "status":
                return (
                    <Chip className="capitalize" color={user.status == "#1" ? "success" : user.status == '#2' ? 'danger' : user.status == '#3' ? 'warning' : "default"} size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <>
            <Table aria-label="Example table with custom cells">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={users}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Table hideHeader>
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={myRanking}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
}