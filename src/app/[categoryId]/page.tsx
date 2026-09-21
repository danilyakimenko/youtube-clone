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
