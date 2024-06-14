function scrollToSection(id: string): void {
	const element = document.getElementById(id);
	
	if (element) {
		element.scrollIntoView({ behavior: 'smooth' });
	} else {
		console.error(`Element with ID ${id} not found`);
	}
}

export default scrollToSection
