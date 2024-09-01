import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";
// import { useState } from "react";
// import { BsThreeDots } from "react-icons/bs";
// import Actions from "./Actions";

// const Comment = ({ userAvatar, createdAt, comment, username, likes }) => {
// 	const [liked, setLiked] = useState(false);

const Comment = ({ reply, lastReply }) => {
	return (
		<>
			<Flex gap={4} py={2} my={2} w={"full"}>
				{/* <Avatar src={userAvatar} size={"sm"} /> */}
				<Avatar src={reply.userProfilePic} size={"sm"} />
				<Flex gap={1} w={"full"} flexDirection={"column"}>
					<Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
						<Text fontSize='sm' fontWeight='bold'>
							{/* {username} */}
							{reply.username}
						</Text>
						{/* <Flex gap={2} alignItems={"center"}>
							<Text fontSize={"sm"} color={"gray.light"}>
								{createdAt}
							</Text>
							<BsThreeDots />
						</Flex> */}
					</Flex>
					{/* <Text>{comment}</Text>
					<Actions liked={liked} setLiked={setLiked} />
					<Text fontSize={"sm"} color={"gray.light"}>
						{likes + (liked ? 1 : 0)} likes
					</Text> */}
					<Text>{reply.text}</Text>
				</Flex>
			</Flex>
			{/* <Divider /> */}
			{!lastReply ? <Divider /> : null}
		</>
	);
};
export default Comment;