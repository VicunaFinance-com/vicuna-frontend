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
import { PlusIcon } from "lucide-react";
import { CloseModal } from "./close-modal";
import { DoubleAvatar } from "../ui/double-avatar";
import { farmsData } from "@/lib/constants";
import { LeveragedFarmingModal } from "./leveraged-farming-modal";

export const LeveragedFarming = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <p className="text-xl">Leveraged Farming</p>
          <div className="flex items-center justify-center gap-4 text-sm font-normal">
            <p>
              Net Value: <span className="px-1 font-semibold">$-1,514.92</span>
            </p>
            <p>
              Total Collateral:{" "}
              <span className="px-1 font-semibold">$0.00</span>
            </p>
            <p>
              Total Debt: <span className="px-1 font-semibold">$1,521.93</span>
            </p>
            <p>
              Total Interest:{" "}
              <span className="px-1 font-semibold text-green-400">$7.01</span>
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
              <TableHead>Leverage</TableHead>
              <TableHead>Debt</TableHead>
              <TableHead>Net Value</TableHead>
              <TableHead>TVL</TableHead>
              <TableHead>Interest Earned</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <DoubleAvatar
                  firstSrc="/icons/coins/ethereum.png"
                  secondSrc="/icons/coins/arbitrum one.png"
                  firstAlt="ETH"
                  secondAlt="ARB"
                  size="default"
                />
              </TableCell>
              <TableCell className="font-bold text-background text-lg">
                2.3x
              </TableCell>
              <TableCell>$1,521.93</TableCell>
              <TableCell>$-1,514.92</TableCell>
              <TableCell>$12,231,341.00</TableCell>
              <TableCell>+ $7.01</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="flex items-end lg:items-center justify-end lg:justify-center gap-4 pt-2 lg:pt-0">
          <LeveragedFarmingModal farm={farmsData[0]}>
            <Button size={"sm"}>
              <PlusIcon className="w-4 h-4 mr-2" />
              Add
            </Button>
          </LeveragedFarmingModal>
          <CloseModal />
        </div>
      </CardContent>
    </Card>
  );
};
