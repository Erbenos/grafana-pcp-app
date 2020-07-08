import React from 'react';
import { VerticalGroup, withTheme, Themeable, Button } from '@grafana/ui';
import { BookmarkItem } from 'store/slices/search/slices/bookmarks/state';
import { EntityType } from 'models/endpoints/search';
import { bookmarkListBtnWithNoSpacing, bookmarkListContainer, bookmarkListContainerMultiCol } from './styles';
import { cx } from 'emotion';

type BookmarkListProps = Themeable & {
  showClearBtn: boolean;
  multiCol: boolean;
  bookmarks: BookmarkItem[];
  onBookmarkClick: (item: string, type: EntityType) => void;
  onClearBookmarksClick: () => void;
};

class BookmarkList extends React.Component<BookmarkListProps, {}> {
  constructor(props: BookmarkListProps) {
    super(props);
    this.onClearBookmarksClick = this.onClearBookmarksClick.bind(this);
    this.onBookmarkClick = this.onBookmarkClick.bind(this);
  }

  onBookmarkClick(item: BookmarkItem) {
    this.props.onBookmarkClick(item.id, item.type);
  }

  onClearBookmarksClick() {
    this.props.onClearBookmarksClick();
  }

  render() {
    const { props, onBookmarkClick, onClearBookmarksClick } = this;
    const { bookmarks } = props;

    if (bookmarks.length === 0) {
      return <p>No bookmarks saved.</p>;
    }

    return (
      <VerticalGroup spacing="md">
        <h4>Bookmarked Results:</h4>
        <VerticalGroup spacing="md">
          <div
            className={
              props.multiCol ? cx(bookmarkListContainer, bookmarkListContainerMultiCol) : bookmarkListContainer
            }
          >
            {bookmarks.map((item, index) => (
              <Button
                key={index}
                variant="link"
                size="md"
                icon="star"
                className={bookmarkListBtnWithNoSpacing}
                onClick={() => onBookmarkClick(item)}
              >
                {item.id}
              </Button>
            ))}
          </div>
          {props.showClearBtn && (
            <Button variant="destructive" size="md" icon="trash-alt" onClick={onClearBookmarksClick}>
              Clear Bookmarks
            </Button>
          )}
        </VerticalGroup>
      </VerticalGroup>
    );
  }
}

export default withTheme(BookmarkList);
export { BookmarkListProps };
