import { useImage } from "react-image";

export function MyImageComponent({ link, alt }) {
	const { src } = useImage({
		srcList: link,
	});

	return <img src={src} alt={alt} />;
}
