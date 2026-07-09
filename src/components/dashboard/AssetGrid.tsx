import { Download, Film, Image, Mail, Smartphone } from 'lucide-react';
import { marketingAssets, type MarketingAsset } from '../../lib/dashboard-data';

const KIND_ICON: Record<MarketingAsset['kind'], typeof Image> = {
  Poster: Image,
  Reel: Film,
  Email: Mail,
  Story: Smartphone,
};

export default function AssetGrid() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
      {marketingAssets.map((asset) => {
        const Icon = KIND_ICON[asset.kind];
        return (
          <li key={asset.name}>
            <button
              type="button"
              className="group flex w-full items-center gap-4 rounded-2xl bg-white p-4 text-left ring-1 ring-ink/6 transition-all hover:shadow-card hover:ring-ink/15"
            >
              <span className="sunrise-bg grid size-11 shrink-0 place-items-center rounded-xl text-white">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-ink">{asset.name}</span>
                <span className="mt-0.5 block font-mono text-[0.65rem] tracking-wide text-ink/45">
                  {asset.kind} · {asset.size} · {asset.downloads.toLocaleString('en-IN')} downloads
                </span>
              </span>
              <Download
                className="size-4 shrink-0 text-ink/30 transition-colors group-hover:text-ocean"
                aria-hidden="true"
              />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
