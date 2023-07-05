type MoviePageProps = {
  params: {
    id: string;
  };
};

export default function MoviePage({ params }: MoviePageProps) {
  return <div>{params.id}</div>;
}
