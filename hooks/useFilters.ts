import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { FilterParams } from "@/lib/types";
import { encodeFilterParams } from "@/lib/utils";

export function useFilters() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const filters: FilterParams = {
        category: searchParams.get("category") || undefined,
        brand: searchParams.get("brand") || undefined,
        price: searchParams.get("price") || undefined,
        ram: searchParams.get("ram") || undefined,
        rom: searchParams.get("rom") || undefined,
        has5G: searchParams.get("has5G") === "true" || undefined,
        sort: (searchParams.get("sort") as FilterParams["sort"]) || undefined,
        page: parseInt(searchParams.get("page") || "1"),
        pageSize: parseInt(searchParams.get("pageSize") || "24"),
    };

    const updateFilters = (newFilters: Partial<FilterParams>) => {
        const merged = { ...filters, ...newFilters };

        // Reset page when filters change (except when page itself changes)
        if (!("page" in newFilters)) {
            merged.page = 1;
        }

        const queryString = encodeFilterParams(merged);
        router.push(`${pathname}?${queryString}`, { scroll: false });
    };

    const resetFilters = () => {
        router.push(pathname);
    };

    return {
        filters,
        updateFilters,
        resetFilters,
    };
}
