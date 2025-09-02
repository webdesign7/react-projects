export default async function BlogPage({params}) {
    params = await params;
    return <div>
        Blog Page
        <p>{params.slug}</p>
    </div>;
}