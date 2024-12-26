import { menuData } from '@/data/menu';
import { MenuSection } from '@/components/menu-section';

export default function MenuPage() {
  return (
    <div className="mx-auto min-h-screen px-4 py-8 text-white">
      {/* Restaurant Logo/Header */}
      <div className="mb-8 flex justify-center">
        <div className="inline-flex -skew-x-12 transform bg-red-highlight px-8 py-3">
          <h1 className="skew-x-12 text-3xl font-bold text-white">
            À La Carte
          </h1>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="mx-auto columns-1 gap-4 sm:columns-2 lg:columns-3">
        {menuData.sections.map((section, index) => (
          <MenuSection key={`${section.title}-${index}`} section={section} />
        ))}
      </div>
    </div>
  );
}
