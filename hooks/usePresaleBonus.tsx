import { PresaleBonus } from "@/lib/constants";

export const usePresaleBonus = (
  selectedMode: 1 | 2 | 3,
  selectedLockTime: 7 | 12 | 18 | 24
) => {
  if (selectedMode == 1) return PresaleBonus[0];
  return PresaleBonus[selectedLockTime][selectedMode == 2 ? 0 : 1];
};
