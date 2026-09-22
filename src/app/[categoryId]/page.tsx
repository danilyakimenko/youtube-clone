import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Videos in category: ...",
};

type CategoryPageProps = {
  params: Promise<{ categoryId: string }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const data = await params
  const categoryId = data.categoryId

  return (
    <div>
      CategoryPage: {categoryId}
    </div>
  );
}
