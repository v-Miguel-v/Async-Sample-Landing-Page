"use strict";

const HTML_CONTENT = document.getElementById("content");
const API = "https://youtube-v31.p.rapidapi.com/playlistItems?playlistId=PLwrcY2kNSwjB8oPiRnudt1kiJjN4UhEqc&part=snippet&maxResults=50";
const DEFAULT_OPTIONS = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "ac12eb66e2msh3f0a8cd19b28c17p16d614jsna25bb004d07f",
		"X-RapidAPI-Host": "youtube-v31.p.rapidapi.com"
	}
};

async function fetchData(apiUrl, requestOptions) {
	const response = await fetch(apiUrl, requestOptions);
	const data = response.json();
	return data;
}

async function getVideosFromPlaylist() {
	try {
		const playlistFullObject = await fetchData(API, DEFAULT_OPTIONS);
		const videos = playlistFullObject.items;

		const videosAsHtml = videos.map(jsonToHtml).join("");
		
		function jsonToHtml(video, index) {
			let videoTitle = `Opening ${index+1}: `;
			switch (index) {
				case 0:
					videoTitle += "Can Do (from GRANRODEO)";
					break;
				case 1:
					videoTitle += "RIMFIRE (from GRANRODEO)";
					break;
				case 2:
					videoTitle += "The Other Self (from GRANRODEO)";
					break;
				case 3:
					videoTitle += "Hengen Jizai no Magical Star (from GRANRODEO)";
					break;
				case 4:
					videoTitle += "Punky Funky Love (from GRANRODEO)";
					break;
				case 5:
					videoTitle += "ZERO (from Kenshō Ono)";
					break;
				case 6:
					videoTitle += "Memories (from GRANRODEO)";
					break;
			}
			
			return `
			<div class="">
			  <div class="flex justify-center">
				<iframe width="426" height="240" src="https://www.youtube.com/embed/${video.snippet.resourceId.videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="youtube-embed-player"></iframe>
			  </div>
			  <div class="mt-2 flex justify-center text-center">
				<h3 class="text-sm text-gray-700">
				  <span aria-hidden="true" class="absolute inset-0"></span>
				  ${videoTitle}
				</h3>
			  </div>
			</div>`;
		}
		
		HTML_CONTENT.innerHTML = videosAsHtml;

	} catch (error) {
		console.error(error);
		alert("Ocurrió un error 😔.");
	}
}

getVideosFromPlaylist();