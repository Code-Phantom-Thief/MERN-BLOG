import NotFound from './notFound.svg';

const BlogNotFound = () => {
    return (
			<div className='flex justify-center items-center p-20'>
				<img
					src={NotFound}
                alt='404'
                className="object-cover"
				/>
			</div>
		);
}

export default BlogNotFound
