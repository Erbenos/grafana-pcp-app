import React from 'react';
import { shallow } from 'enzyme';
import { BookmarkItem } from 'store/slices/search/slices/bookmarks/state';
import { EntityType } from 'models/endpoints/search';
import BookmarkList from './BookmarkList';

describe('<BookmarkList/>', () => {
  const placeholderCallbacks = {
    onBookmarkClick: () => void 0,
    onClearBookmarksClick: () => void 0,
  };

  const bookmarkItems: BookmarkItem[] = [
    {
      id: 'statsd.settings.dropped',
      type: EntityType.Metric,
    },
    {
      id: '60.2',
      type: EntityType.InstanceDomain,
    },
  ];

  test('renders without crashing', () => {
    shallow(<BookmarkList bookmarks={[]} {...placeholderCallbacks} />).dive();
  });

  test('renders multiple columns by default', () => {
    const component = shallow(<BookmarkList bookmarks={bookmarkItems} {...placeholderCallbacks} />)
      .dive()
      .dive();
    expect(component.exists('[data-test="multicol"]')).toBe(true);
  });

  test('renders clear button by default', () => {
    const component = shallow(<BookmarkList bookmarks={bookmarkItems} {...placeholderCallbacks} />)
      .dive()
      .dive();
    expect(component.exists('[data-test="bookmark-reset"]')).toBe(true);
  });

  test('accepts both single column and multi column prop settings', () => {
    const singleCol = shallow(<BookmarkList bookmarks={bookmarkItems} multiCol={false} {...placeholderCallbacks} />)
      .dive()
      .dive();
    expect(singleCol.exists('[data-test="singlecol"]')).toBe(true);

    const multiCol = shallow(<BookmarkList bookmarks={bookmarkItems} multiCol={true} {...placeholderCallbacks} />)
      .dive()
      .dive();
    expect(multiCol.exists('[data-test="multicol"]')).toBe(true);
  });

  test('accepts conditional showing of clear button', () => {
    const hasClear = shallow(<BookmarkList bookmarks={bookmarkItems} showClearBtn={true} {...placeholderCallbacks} />)
      .dive()
      .dive();
    expect(hasClear.exists('[data-test="bookmark-reset"]')).toBe(true);

    const lacksClear = shallow(
      <BookmarkList bookmarks={bookmarkItems} showClearBtn={false} {...placeholderCallbacks} />
    )
      .dive()
      .dive();
    expect(lacksClear.exists('[data-test="bookmark-reset"]')).toBe(false);
  });

  test('calls onBookmarkClick properly', () => {
    const onBookmarkClickMock = jest.fn(() => void 0);
    const component = shallow(
      <BookmarkList bookmarks={bookmarkItems} {...placeholderCallbacks} onBookmarkClick={onBookmarkClickMock} />
    )
      .dive()
      .dive();
    const buttons = component.find('[data-test="bookmark-go"]');
    buttons.forEach(button => button.simulate('click'));
    expect(onBookmarkClickMock).toHaveBeenCalledTimes(bookmarkItems.length);
  });

  test('calls onClearBookmarksClick properly', () => {
    const onClearBookmarksClickMock = jest.fn(() => void 0);
    const component = shallow(
      <BookmarkList
        bookmarks={bookmarkItems}
        {...placeholderCallbacks}
        onClearBookmarksClick={onClearBookmarksClickMock}
      />
    )
      .dive()
      .dive();
    const button = component.find('[data-test="bookmark-reset"]');
    button.simulate('click');
    expect(onClearBookmarksClickMock).toHaveBeenCalled();
  });

  test('renders passed all bookmarks items', () => {
    const component = shallow(<BookmarkList bookmarks={bookmarkItems} {...placeholderCallbacks} />)
      .dive()
      .dive();
    expect(component.find('[data-test="bookmark-go"]').length).toBe(bookmarkItems.length);
  });

  test('handles no bookmarks items', () => {
    const component = shallow(<BookmarkList bookmarks={[]} {...placeholderCallbacks} />)
      .dive()
      .dive();
    expect(component.exists('[data-test="bookmark-go"]')).toBe(false);
  });
});
