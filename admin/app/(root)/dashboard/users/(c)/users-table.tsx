"use client";

import { ReactNode, useState } from "react";
import { users } from "./data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CircleAlertIcon,
  MoreHorizontal,
  ShieldUser,
  StoreIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useGetUsers, useUpdateUserRole } from "@/service/query/useUsers";
import { User } from "@/types/api-user-type";
import { Spinner } from "@/components/ui/spinner";
import { convertDate } from "@/utils/dateConvert";
import { RadioGroup } from "@/components/ui/radio-group";
import { RadioGroupItem } from "@/components/ui/radio-group";

const ITEMS_PER_PAGE = 5;

export function UsersTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentUsers = users.slice(startIndex, endIndex);

  const {
    data: usersData,
    isLoading,
    isError,
  } = useGetUsers({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  });

  if (isLoading) {
    return <Spinner className="mx-4" />;
  }

  if (isError) {
    return <div>Error loading users</div>;
  }

  const isActive = (user: User) => {
    const THREE_DAYS = 3 * 24 * 60 * 60 * 1000; // 3 days in ms
    return Date.now() - new Date(user.lastLoggedIn).getTime() < THREE_DAYS;
  };

  return (
    <Card className="border-none bg-background">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Last Login</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usersData?.items?.map((user: User) => (
              <TableRow key={user._id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={user.picture}
                        alt="Avatar"
                        data-ai-hint="person avatar"
                      />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-0.5">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Badge
                    variant={isActive(user) ? "outline" : "secondary"}
                    className={
                      isActive(user)
                        ? "text-green-700 border-green-400"
                        : "text-gray-600 border-gray-400"
                    }
                  >
                    {isActive(user) ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {convertDate(user.lastLoggedIn)}
                </TableCell>

                {user.role !== "owner" ? (
                  <>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <Separator />
                          <UserRolesChangeDialog
                            id={user._id}
                            defaultValue={user.role}
                          >
                            <DropdownMenuItem
                              defaultValue={user.role}
                              onSelect={(e) => e.preventDefault()}
                            >
                              Edit Role
                            </DropdownMenuItem>
                          </UserRolesChangeDialog>

                          <UserDeactivateDialog>
                            <DropdownMenuItem
                              className="text-destructive"
                              onSelect={(e) => e.preventDefault()}
                            >
                              Delete
                            </DropdownMenuItem>
                          </UserDeactivateDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <Separator />
                          <DropdownMenuItem
                            defaultValue={user.role}
                            onSelect={(e) => e.preventDefault()}
                          >
                            Edit Profile
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center justify-between text-xs text-muted-foreground">
          <div>
            Showing{" "}
            <strong>
              {Math.min(startIndex + 1, users.length)} -{" "}
              {Math.min(endIndex, users.length)}
            </strong>{" "}
            of <strong>{users.length}</strong> users
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

const UserDeactivateDialog = ({ children }: { children: ReactNode }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <CircleAlertIcon className="opacity-80" size={16} />
          </div>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to Delete this user? All their data will be
              removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive hover:bg-destructive/90">
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

// const UserRolesChangeDialog = ({
//   children,
//   defaultValue,
//   id,
// }: {
//   children: ReactNode;
//   defaultValue?: string;
//   id: string;
// }) => {
//   const [role, setRole] = useState(defaultValue || "student");
//   const { mutate: updateUserRole } = useUpdateUserRole();

//   useEffect(() => {
//     if (role) {
//       updateUserRole({ id, role });
//     }
//   }, [role, id, updateUserRole]);

//   const handleSubmit = () => {
//     setRole(role);
//   };

//   const clickCss =
//     "border-primary/50 has-focus-visible:border-ring has-focus-visible:ring-ring/50";

//   return (
//     <Dialog>
//       <DialogTrigger asChild>{children}</DialogTrigger>
//       <DialogContent>
//         <div className="mb-2 flex flex-col gap-2">
//           <div
//             className="flex size-11 shrink-0 items-center justify-center rounded-full border"
//             aria-hidden="true"
//           >
//             <ShieldUser className="opacity-80" size={16} />
//           </div>
//           <DialogHeader>
//             <DialogTitle className="text-left">Role Change</DialogTitle>
//             <DialogDescription className="text-left">
//               Select the new role for the user.
//             </DialogDescription>
//           </DialogHeader>
//         </div>

//         <form className="space-y-5">
//           <div className="space-y-4">
//             <RadioGroup
//               className="grid-cols-1"
//               defaultValue={role}
//               value={role}
//               onValueChange={setRole}
//             >
//               {/* admin */}
//               <label
//                 className={`border-input ${
//                   role === "admin" ? clickCss : ""
//                 } relative flex cursor-pointer flex-col gap-1 rounded-md border px-4 py-3 shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:ring-[3px]`}
//               >
//                 <RadioGroupItem
//                   id="radio-admin"
//                   value="admin"
//                   className="sr-only after:absolute after:inset-0"
//                 />
//                 <p className="text-foreground text-sm font-medium">Admin</p>
//                 <p className="text-muted-foreground text-sm">
//                   Manage all users and courses
//                 </p>
//               </label>
//               {/* instructor */}
//               <label
//                 className={`border-input ${
//                   role === "instructor" ? clickCss : ""
//                 } relative flex cursor-pointer flex-col gap-1 rounded-md border px-4 py-3 shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:ring-[3px]`}
//               >
//                 <RadioGroupItem
//                   id="radio-instructor"
//                   value="instructor"
//                   className="sr-only after:absolute after:inset-0"
//                 />
//                 <p className="text-foreground text-sm font-medium">
//                   Instructor
//                 </p>
//                 <p className="text-muted-foreground text-sm">
//                   Create and manage courses
//                 </p>
//               </label>
//               {/* student */}
//               <label
//                 className={`border-input ${
//                   role === "student" ? clickCss : ""
//                 } relative flex cursor-pointer flex-col gap-1 rounded-md border px-4 py-3 shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:ring-[3px]`}
//               >
//                 <RadioGroupItem
//                   id="radio-student"
//                   value="student"
//                   className="sr-only after:absolute after:inset-0"
//                 />
//                 <p className="text-foreground text-sm font-medium">Student</p>
//                 <p className="text-muted-foreground text-sm">
//                   Enroll in courses and track progress
//                 </p>
//               </label>
//             </RadioGroup>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

export const UserRolesChangeDialog = ({
  children,
  defaultValue = "student",
  id,
}: {
  children: ReactNode;
  defaultValue?: string;
  id: string;
}) => {
  const [role, setRole] = useState(defaultValue || "student");
  const { mutateAsync: updateUserRole } = useUpdateUserRole();
  const [isOpen, setIsOpen] = useState(false);

  const handleRoleChange = async (newRole: string) => {
    setRole(newRole);

    try {
      await updateUserRole({ id, role: newRole });
      setIsOpen(false);
    } catch (error) {
      console.error("❌ Failed to update role:", error);
    }
  };

  const clickCss =
    "border-primary/50 has-focus-visible:border-ring has-focus-visible:ring-ring/50";

  const roles = [
    {
      value: "admin",
      title: "Admin",
      desc: "Manage all users and courses",
    },
    {
      value: "instructor",
      title: "Instructor",
      desc: "Create and manage courses",
    },
    {
      value: "student",
      title: "Student",
      desc: "Enroll in courses and track progress",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <div className="mb-2 flex flex-col gap-2">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full border">
            <ShieldUser className="opacity-80" size={16} />
          </div>
          <DialogHeader>
            <DialogTitle className="text-left">Change User Role</DialogTitle>
            <DialogDescription className="text-left">
              Select a new role. The change will apply instantly.
            </DialogDescription>
          </DialogHeader>
        </div>

        <RadioGroup
          value={role}
          onValueChange={handleRoleChange}
          className="space-y-3"
        >
          {roles.map(({ value, title, desc }) => (
            <label
              key={value}
              className={`border-input ${
                role === value ? clickCss : ""
              } relative flex cursor-pointer flex-col gap-1 rounded-md border px-4 py-3 shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:ring-[3px]`}
            >
              <RadioGroupItem
                id={`radio-${value}`}
                value={value}
                className="sr-only after:absolute after:inset-0"
              />
              <p className="text-foreground text-sm font-medium">{title}</p>
              <p className="text-muted-foreground text-sm">{desc}</p>
            </label>
          ))}
        </RadioGroup>
      </DialogContent>
    </Dialog>
  );
};
