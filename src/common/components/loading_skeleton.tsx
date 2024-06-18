import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';

const LoadingSkeleton = ({count, className}: { count?: number, className?: string }) => {
	return (
		<SkeletonTheme baseColor="#202020" highlightColor="#444">
			<p>
				<Skeleton count={count} className={className}/>
			</p>
		</SkeletonTheme>
	)
}
export default LoadingSkeleton
