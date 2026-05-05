export default function Spinner() {
  return (
    <div className="flex min-h-64 items-center justify-center">
      <div className="h-14 w-14 animate-spin rounded-full border-4 border-sky-100 border-t-primary dark:border-slate-800 dark:border-t-primary" />
    </div>
  );
}
