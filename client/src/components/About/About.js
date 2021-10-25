import { motion } from 'framer-motion';

const About = () => {
	return (
		<>
			<div className='flex flex-col md:flex-row justify-center items-start p-10'>
				<div className='md:w-6/12'>
					<h1 className='text-4xl font-extrabold md:text-center'>
						Frontend,Backend and FullStack.
					</h1>
				</div>
				<div className='mt-5 md:w-6/12 md:items-center'>
					<p className=' font-light text-xl '>
						Hello, everyone. My name is Code Phantom Thief.
						<br />
						<br />
						I am frontend, backend and fullstack developer.
						<br /> I am based on Japan, but I have
						willingness to work all over the world. <br />
						<br />
						If you interested in me and would like to hire
						me, please feel free to contact by Email or
						Social media. <br />
						<br /> By the way, I created this site's
						Frontend with React / TailwindCSS /
						FramerMotion. Backend with MongoDB(Mongoose) /
						Express / Joi / JsonWebToken with
						HttpOnlyCookie. <br />
						<br /> Thank you for reading. And, happy
						codeing.
					</p>
					<h1 className='text-xl font-bold mt-10'>
						code.phantom.thief1616@gmail.com
					</h1>
				</div>
			</div>
			<div className='flex flex-col p-5'>
				<motion.img
					initial={{ opacity: 0.2, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3, duration: 0.8 }}
					src='https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80'
					alt='aboutimage'
				/>
			</div>
		</>
	);
};

export default About;
