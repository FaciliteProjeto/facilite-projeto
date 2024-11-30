"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LucideIcon, User2 } from "lucide-react";
import { cn } from "@/lib/utils";

const CustomIcon: React.FC<{
  size?: number;
  className?: string;
  Icon?: LucideIcon;
}> = ({ size = 18, className = "", Icon = User2 }) => {
  return <Icon size={size} className={className} />;
};

interface IForm {
  titleButton?: string;
  subtitle: string;
  description: string;
  children: React.ReactNode;
  typeActiveDialogForm: boolean;
  triggerButtonContent?: React.ReactNode;
  onConfirmAction: () => void;
  confirmButtonText?: string;
  cancelButtonText?: string;
  icon?: LucideIcon;
  isIcon?: boolean;
  dialogClassNames?: string;
}

export default function FormComponent({
  titleButton,
  subtitle,
  description,
  children,
  triggerButtonContent,
  onConfirmAction,
  confirmButtonText = "Confirmar",
  cancelButtonText = "Cancelar",
  icon = User2,
  dialogClassNames = "w-100",
  isIcon = false,
}: IForm) {
  return (
    <Dialog>
      <DialogTrigger>
        {triggerButtonContent ? (
          triggerButtonContent
        ) : (
          <Button
            variant="outline"
            className={`${
              isIcon
                ? "py-1 w-10 px-2 mr-2 border-2 border-[#36659B] hover:bg-[#477ebd] hover:text-white transition"
                : "bg-gray-800 text-white mb-3"
            } p-2 items-center flex `}
          >
            {isIcon ? <CustomIcon Icon={icon} /> : titleButton}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className={dialogClassNames}>
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <CustomIcon className="mr-2" Icon={icon} />
            {subtitle}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="mt-4 w-full">{children}</div>
        <DialogFooter className="flex justify-center space-x-4">
          <Button
            className="px-4 py-2 bg-gray-800 text-white hover:bg-gray-700"
            onClick={onConfirmAction}
          >
            {confirmButtonText}
          </Button>
          <DialogClose asChild>
            <Button
              variant="outline"
              className="px-4 py-2 bg-red-300 hover:bg-red-400"
            >
              {cancelButtonText}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
