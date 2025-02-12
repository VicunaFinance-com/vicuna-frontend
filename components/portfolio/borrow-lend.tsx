import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusIcon, X } from "lucide-react";
import { CloseModal } from "./close-modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BorrowLendModal } from "./borrow-lend-modal";
import { LeveragedModal } from "./leveraged-modal";
import { MarketModal } from "../new/markets/MarketModal";

export const BorrowLend = () => {
  const [showSupplyModal, setShowSupplyModal] = useState(false);
  const [showRepayModal, setShowRepayModal] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <p className="text-xl">Borrow/Lend</p>
          <div className="flex items-center justify-center gap-4 text-sm font-normal">
            <p>
              Net Value: <span className="px-1 font-semibold">$1,000.00</span>
            </p>
            <p>
              Total Collateral:{" "}
              <span className="px-1 font-semibold">$3,000.00</span>
            </p>
            <p>
              Total Debt: <span className="px-1 font-semibold">$0.00</span>
            </p>
            <p>
              Total Interest:{" "}
              <span className="px-1 font-semibold text-green-400">$3.31</span>
            </p>
          </div>
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="w-full flex flex-col lg:flex-row items-center">
        <Table className="lg:table-fixed">
          <TableHeader>
            <TableRow className="border-none">
              <TableHead>Collateral</TableHead>
              <TableHead>Deposited</TableHead>
              <TableHead>Borrowed</TableHead>
              <TableHead>Net Value</TableHead>
              <TableHead>TVL</TableHead>
              <TableHead>Interest Earned</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="flex items-center gap-2">
                <Avatar className="w-8 h-8 bg-background p-1.5">
                  <AvatarImage src="/icons/coins/usdc.png" />
                  <AvatarFallback>USDC</AvatarFallback>
                </Avatar>
                USDC
              </TableCell>
              <TableCell>$3,000.00</TableCell>
              <TableCell>$0.00</TableCell>
              <TableCell>$3,000.00</TableCell>
              <TableCell>$12,304.00</TableCell>
              <TableCell>+ $3.31</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="flex items-end lg:items-center justify-end lg:justify-center gap-4 pt-2 lg:pt-0">
          {/* <SupplyModal
            borrow={borrowData[0]}
            defaultIsBorrow={false}
            isVisible={showSupplyModal}
            onClose={() => setShowSupplyModal(false)}
          >
            <Button size={"sm"} onClick={() => setShowSupplyModal(true)}>
              <PlusIcon className="w-4 h-4 mr-2" />
              Supply
            </Button>
          </SupplyModal> */}

          {/* this component is not used in the app. delete? */}
          {/* <BorrowLendModal borrow={borrowData[0]}>
            <Button size={"sm"}>
              <PlusIcon className="w-4 h-4 mr-2" />
              Modify
            </Button>
          </BorrowLendModal> */}

          {/* conbining Leverage Modal content into Supply Modal component */}
          {/* note that I added the isVisible and onClose properties, so that the component will reset to it's intiial state based on which trigger is used - supply or repay */}
          {/* <SupplyModal
            borrow={borrowData[0]}
            defaultIsBorrow={true}
            isVisible={showRepayModal}
            onClose={() => setShowRepayModal(false)}
          >
            <Button size={"sm"} onClick={() => setShowRepayModal(true)}>
              <X className="w-4 h-4 mr-2" />
              Repay
            </Button>
          </SupplyModal> */}

          {/* old Leveraged Modal (combined into supply modal) */}
          {/* <LeveragedModal borrow={borrowData[0]}>
            <Button size={"sm"}>
              <X className="w-4 h-4 mr-2" />
              Repay
            </Button>
          </LeveragedModal> */}
        </div>
      </CardContent>
    </Card>
  );
};
