The brand row is now managed in the Studio: **Site settings → Homepage → Brands / logos
row**. Add, remove, reorder brands and upload logos there — no code or deploy needed.

`lib/brands.ts` + the marks in this folder are the **fallback**: they render only while the
Studio `brands` field is empty. `npm run publish:brands` seeds this folder's logos into the
Studio in one go (run `npx sanity login` first). After that, manage brands in the Studio.

Marks in this folder are picked up by the fallback row as `<slug>.svg` or `.png`.

Present: salesforce (Wikimedia Commons), burger-king (Simple Icons), t-mobile (Wikimedia
Commons), at-t (Wikimedia Commons), examsoft (Turnitin's mark, Wikimedia Commons).
Still wordmarks, no public artwork found: openclinica, centerbase, taxrise-inc, alokito-teachers.
Add a file with one of those slugs to replace the name.
