import React from 'react';
import { VerticalGroup, Input, Icon, Button, HorizontalGroup, Checkbox, Field } from '@grafana/ui';
import { connect } from 'react-redux';

import { querySearch } from '../../actions/search';
import { RootState } from '../../reducers/reducers';
import { SearchEntity } from '../../actions/types';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators, AnyAction } from 'redux';
import { searchContainer, searchFormGroup, searchBlock, searchSubmitBtn } from './styles';

const mapStateToProps = (state: RootState) => ({
  query: state.search.query,
  bookmarks: state.search.bookmarks,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, null, AnyAction>) =>
  bindActionCreators({ querySearch }, dispatch);

type SearchFormProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

interface SearchFormState {
  inputTouched: boolean;
  query: {
    pattern: string;
    entityFlags: SearchEntity;
  };
}

class SearchForm extends React.Component<SearchFormProps, SearchFormState> {
  state: SearchFormState = this.initialState;

  get initialState() {
    return {
      inputTouched: false,
      query: {
        pattern: '',
        entityFlags: SearchEntity.All,
      },
    };
  }

  constructor(props: SearchFormProps) {
    super(props);
    if (props.query) {
      this.setState({ query: props.query });
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.setEntityFlag = this.setEntityFlag.bind(this);
  }

  componentWillReceiveProps(props: SearchFormProps) {
    this.setState({ query: props.query, inputTouched: false });
  }

  onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const submitForm = () => {
      if (!(this.state.inputTouched && this.isValidInput)) {
        return;
      }
      this.props.querySearch({ ...this.state.query, pageNum: 1 });
    };
    if (this.state.inputTouched) {
      submitForm();
    } else {
      this.setState({ inputTouched: true }, () => {
        submitForm();
      });
    }
  }

  onInputChange(e: React.FormEvent<HTMLInputElement>) {
    this.setState({ inputTouched: true });
    this.setState({
      query: {
        ...this.state.query,
        pattern: e.currentTarget.value,
      },
    });
  }

  get metricFlag(): boolean {
    return (this.state.query.entityFlags & (1 << 0)) > 0;
  }

  get instanceDomainsFlag(): boolean {
    return (this.state.query.entityFlags & (1 << 1)) > 0;
  }

  get instancesFlag(): boolean {
    return (this.state.query.entityFlags & (1 << 2)) > 0;
  }

  get isValidInput(): boolean {
    return this.state.query.pattern.trim() !== '';
  }

  get isTouchedInput(): boolean {
    return this.state.inputTouched;
  }

  setEntityFlag(entity: SearchEntity) {
    this.setState({
      query: {
        ...this.state.query,
        entityFlags: this.state.query.entityFlags ^ entity,
      },
    });
  }

  render() {
    const {
      onSubmit,
      onInputChange,
      state,
      metricFlag,
      instancesFlag,
      instanceDomainsFlag,
      setEntityFlag,
      isValidInput,
      isTouchedInput,
    } = this;
    const { pattern } = state.query;
    return (
      <form className={searchContainer} onSubmit={onSubmit}>
        <VerticalGroup spacing="sm">
          <div className={searchFormGroup}>
            <Field
              className={searchBlock}
              invalid={!isValidInput && isTouchedInput}
              error={!isValidInput && isTouchedInput ? 'This input is required' : ''}
            >
              <Input
                prefix={<Icon name="search" />}
                value={pattern}
                onChange={onInputChange}
                placeholder="Search Phrase"
              />
            </Field>
            <Button className={searchSubmitBtn} variant="primary" size="md" type="submit">
              Search
            </Button>
          </div>
          <div className={searchFormGroup}>
            <HorizontalGroup spacing="lg">
              <Checkbox value={metricFlag} onChange={() => setEntityFlag(SearchEntity.Metrics)} label="Metrics" />
              <Checkbox
                value={instancesFlag}
                onChange={() => setEntityFlag(SearchEntity.Instances)}
                label="Instances"
              />
              <Checkbox
                value={instanceDomainsFlag}
                onChange={() => setEntityFlag(SearchEntity.InstanceDomains)}
                label="Instance Domains"
              />
            </HorizontalGroup>
          </div>
        </VerticalGroup>
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
export { SearchEntity, SearchFormProps };
