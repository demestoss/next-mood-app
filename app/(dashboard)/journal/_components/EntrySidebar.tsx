export default function EntrySidebar() {
	const analysisData = [
		{
			name: "Summary",
			value: "",
		},
		{
			name: "Subject",
			value: "",
		},
		{
			name: "Mood",
			value: "",
		},
		{
			name: "Negative",
			value: "False",
		},
	];

	return (
		<div>
			<div className="bg-blue-300 px-6 py-10">
				<h2 className="text-2xl">Analysis</h2>
			</div>
			<ul>
				{analysisData.map((item) => (
					<li
						key={item.name}
						className="flex items-center justify-between px-2 py-4 border-b border-default-200"
					>
						<span className="text-large font-semibold">{item.name}</span>
						<span>{item.value}</span>
					</li>
				))}
			</ul>
		</div>
	);
}
