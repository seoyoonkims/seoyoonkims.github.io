---
layout: default
title: "2026 Nature Conference: Autonomous Robotics"
description: "A robot that successfully plays the shell game regardless of tricks, shuffle speed, or shuffle length, showcased in a live demo at the 2026 Nature Conference."
image: /assets/images/projects/nature-conference-2026/shell-game.webp
permalink: /projects/nature-conference-2026/
project_id: nature-conference-2026
---

{% assign project = site.data.profile.projects | where: 'id', page.project_id | first %}
<p>{{ project.description | escape }}</p>

{% for video in project.videos %}
<section aria-labelledby="{{ video.id }}">
  <h2 id="{{ video.id }}">{{ video.title | escape }}</h2>
  <figure class="project-video">
    <video controls playsinline preload="none" poster="{{ video.poster | relative_url }}" width="{{ video.width }}" height="{{ video.height }}" aria-label="{{ video.title | escape }}" aria-describedby="{{ video.id }}-caption">
      <source src="{{ video.src | relative_url }}" type="video/mp4">
      <a href="{{ video.src | relative_url }}">Download {{ video.title | escape }}</a>
    </video>
    <figcaption id="{{ video.id }}-caption">{{ video.caption | escape }}</figcaption>
  </figure>
</section>
{% endfor %}

<p class="project-back"><a href="{{ '/' | relative_url }}#projects">Back to Projects</a></p>
