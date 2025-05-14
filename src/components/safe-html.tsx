import { useMemo } from 'react';

type SafeHTMLProps = {
    content: string;
    className?: string;
};

enum EAllowedTags {
    BOLD = 'b',
    ITALIC = 'i',
    STRONG = 'strong',
    TOPIC = 'li',
    PARAGRAPH = 'p',
    BREAK = 'br',
}

const allowedTags: readonly EAllowedTags[] = Object.freeze([
    EAllowedTags.BOLD,
    EAllowedTags.ITALIC,
    EAllowedTags.STRONG,
    EAllowedTags.PARAGRAPH,
    EAllowedTags.TOPIC,
    EAllowedTags.BREAK,
]);

function sanitize(content: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');

    function cleanNode(node: Node): Node | null {
        if (node.nodeType === Node.TEXT_NODE) {
            return node.cloneNode();
        }

        if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as HTMLElement;
            const tagName = el.tagName.toLowerCase();

            if (!allowedTags.includes(tagName as EAllowedTags)) return null;

            const cleanEl = document.createElement(tagName);

            Array.from(el.attributes).forEach((attr) => {
                if (attr.name.toLowerCase() === 'class') {
                    cleanEl.setAttribute(attr.name, attr.value);
                }
            });

            for (const child of Array.from(el.childNodes)) {
                const cleaned = cleanNode(child);
                if (cleaned) cleanEl.appendChild(cleaned);
            }

            return cleanEl;
        }

        return null;
    }

    const body = doc.body;
    const fragment = document.createDocumentFragment();

    for (const node of Array.from(body.childNodes)) {
        const cleaned = cleanNode(node);
        if (cleaned) fragment.appendChild(cleaned);
    }

    const div = document.createElement('div');
    div.appendChild(fragment);
    return div.innerHTML;
}

export function SafeHTML({ content, className }: SafeHTMLProps) {
    const sanitized = useMemo(() => sanitize(content), [content]);

    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{ __html: sanitized }}
        />
    );
}
