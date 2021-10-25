const BlogAdvertising = () => {
	return (
		<div className='grid grid-cols-1 relative'>
			<img
				src='https://images.unsplash.com/photo-1502355984-b735cb2550ce?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1169&q=80'
				alt='advertising'
				className='object-cover w-screen p-5 opacity-50'
			/>
			<div className='absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4'>
				<h1 className='font-extrabold text-2xl text-center md:text-4xl text-gray-700 whitespace-nowrap'>
					<a
						href='https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs/lessons/blog-api'
						target='_blank'
						rel='noreferrer'
					>
						This is for The Odin Project
					</a>
				</h1>
				<p className='whitespace-nowrap text-center text-sm md:text-xl font-light'>
					Thank you for coming. And, happy coding!!!
				</p>
			</div>
		</div>
	);
};

export default BlogAdvertising;
