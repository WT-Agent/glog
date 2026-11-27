import { getCollection, type CollectionEntry } from 'astro:content';

export async function getBlogPosts() {
    const posts = await getCollection('blog');
    return posts.filter(post => !post.data.draft);
}

export async function getSortedBlogPosts() {
    const posts = await getBlogPosts();
    return posts.sort((a, b) => {
        // First sort by sticky status
        const stickyA = a.data.sticky ? 1 : 0;
        const stickyB = b.data.sticky ? 1 : 0;
        if (stickyB !== stickyA) return stickyB - stickyA;

        // Then sort by date
        const dateDiff = b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
        if (dateDiff !== 0) return dateDiff;
        return b.id.localeCompare(a.id);
    });
}

/**
 * Get related posts for a given post
 * Priority: 1. Series (Prev/Next) 2. Same Tags 3. Latest Posts
 */
export async function getRelatedPosts(currentPost: CollectionEntry<'blog'>) {
    const allPosts = await getSortedBlogPosts();
    const currentId = currentPost.id;
    const currentTags = currentPost.data.tags || [];
    const currentSeries = currentPost.data.series;

    let related: {
        prevInSeries?: CollectionEntry<'blog'>;
        nextInSeries?: CollectionEntry<'blog'>;
        byTags: CollectionEntry<'blog'>[];
    } = { byTags: [] };

    // 1. Handle Series logic
    if (currentSeries) {
        const seriesPosts = allPosts
            .filter(p => p.data.series === currentSeries)
            .sort((a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf());
        
        const currentIndex = seriesPosts.findIndex(p => p.id === currentId);
        if (currentIndex > 0) related.prevInSeries = seriesPosts[currentIndex - 1];
        if (currentIndex < seriesPosts.length - 1) related.nextInSeries = seriesPosts[currentIndex + 1];
    }

    // 2. Handle Tag logic (Top 3 related by overlapping tags, excluding series siblings)
    if (currentTags.length > 0) {
        related.byTags = allPosts
            .filter(p => p.id !== currentId && 
                        p.id !== related.prevInSeries?.id && 
                        p.id !== related.nextInSeries?.id)
            .map(p => {
                const overlappingTags = (p.data.tags || []).filter(tag => currentTags.includes(tag));
                return { post: p, score: overlappingTags.length };
            })
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score || b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf())
            .slice(0, 3)
            .map(item => item.post);
    }

    // 3. Fallback to latest if nothing found
    if (related.byTags.length < 3 && !currentSeries) {
        const latest = allPosts
            .filter(p => p.id !== currentId)
            .slice(0, 3);
        related.byTags = [...new Set([...related.byTags, ...latest])].slice(0, 3);
    }

    return related;
}
