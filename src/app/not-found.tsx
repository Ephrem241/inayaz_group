import Link from "next/link";

export default function NotFound() {
  return (
    <div className="section-light flex min-h-screen items-center py-16 md:py-24 lg:py-32">
      <div className="container-content text-center">
        <p className="text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">
          404
        </p>
        <h1 className="mt-4 text-4xl">Page Not Found</h1>
        <p className="mt-4 text-base text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Link href="/" className="btn btn-primary mt-8 inline-flex">
          Return Home
        </Link>
      </div>
    </div>
  );
}
