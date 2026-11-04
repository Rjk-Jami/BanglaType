import { Pattern1FormDemo } from './Pattern1FormDemo';
import { Pattern2EditorDemo } from './Pattern2EditorDemo';
import { Pattern3HeadlessInputDemo } from './Pattern3HeadlessInputDemo';
import { Pattern4HeadlessEditorDemo } from './Pattern4HeadlessEditorDemo';
import { Pattern5PureFunctionsDemo } from './Pattern5PureFunctionsDemo';
import { BringYourOwnUiShowcase } from './BringYourOwnUiShowcase';

export function DocPatternsSection() {
  return (
    <section id="patterns" className="space-y-8 scroll-mt-24">
      <div className="space-y-2 pb-2 border-b border-[#D9E2DD] dark:border-[#20312B]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#006A4E] text-white flex items-center justify-center font-bold text-xs">
            ৩
          </div>
          <h2 className="font-heading text-2xl font-bold text-[#14201B] dark:text-[#EDF5F1]">
            ৫টি ইন্টিগ্রেশন প্যাটার্ন (লাইভ ডেমো ও কোড)
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-body">
          সহজ ড্রপ-ইন ফর্ম থেকে শুরু করে সম্পূর্ণ হেডলেস হুক এবং পিউর নোডজেএস ফাংশন পর্যন্ত সব ব্যবহারের উপায় নিচে সরাসরি লাইভ চালিয়ে দেখুন:
        </p>
      </div>

      {/* Pattern 1 */}
      <Pattern1FormDemo />

      {/* Pattern 2 */}
      <Pattern2EditorDemo />

      {/* Pattern 3 */}
      <Pattern3HeadlessInputDemo />

      {/* Bring Your Own UI Showcase */}
      <BringYourOwnUiShowcase />

      {/* Pattern 4 */}
      <Pattern4HeadlessEditorDemo />

      {/* Pattern 5 */}
      <Pattern5PureFunctionsDemo />
    </section>
  );
}
