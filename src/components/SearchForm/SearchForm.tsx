import React from 'react';
import { VerticalGroup, Input, Icon, Button, HorizontalGroup, Checkbox } from '@grafana/ui';

import { SearchContainer, SearchSubmitBtn, SearchFormGroup } from './styles';

enum SearchEntity {
  None = 0,
  Metrics = 1 << 0,
  InstanceDomains = 1 << 1,
  Instances = 1 << 2,
  All = Metrics | InstanceDomains | Instances,
};

interface SearchOpt {
  pattern: string,
  entityFlags: SearchEntity,
};

interface SearchFormProps {
  onSubmit: (opt: SearchOpt) => void,
};

interface SearchFormState {
  pattern: string,
  entityFlags: SearchEntity,
};

class SearchForm extends React.Component<SearchFormProps, SearchFormState> {
  state: SearchFormState = this.initialState;

  get initialState() {
    return {
      pattern: '',
      entityFlags: SearchEntity.All,
    }
  }

  constructor(props: SearchFormProps) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onPatternChange = this.onPatternChange.bind(this);
    this.setEntityFlag = this.setEntityFlag.bind(this);
  }

  onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { props, state } = this;
    const { pattern, entityFlags } = state;
    props.onSubmit({ pattern, entityFlags });
  }

  onPatternChange(e: React.FormEvent<HTMLInputElement>) {
    this.setState({ pattern: e.currentTarget.value });
  }

  get metricFlag(): boolean {
    return (this.state.entityFlags & 1 << 0) > 0;
  }

  get instanceDomainsFlag(): boolean {
    return (this.state.entityFlags & 1 << 1) > 0;
  }

  get instancesFlag(): boolean {
    return (this.state.entityFlags & 1 << 2) > 0;
  }

  setEntityFlag(entity: SearchEntity) {
    this.setState({ entityFlags: this.state.entityFlags ^ entity });
  }

  render() {
    const { onSubmit, onPatternChange, state, metricFlag, instancesFlag, instanceDomainsFlag, setEntityFlag } = this;
    return (
      <form className={SearchContainer} onSubmit={onSubmit}>
        <VerticalGroup spacing="sm">
          <div className={SearchFormGroup}>
            <Input
              prefix={<Icon name="search" />}
              value={state.pattern}
              onChange={onPatternChange}
              placeholder="Search Phrase"/>
            <Button
              className={SearchSubmitBtn}
              variant="primary"
              size="md"
              type="submit">
              Search
            </Button>
          </div>
          <div className={SearchFormGroup}>
            <HorizontalGroup spacing="lg">
              <Checkbox
                value={metricFlag}
                onChange={(e) => setEntityFlag(SearchEntity.Metrics)}
                label="Metrics"
              />
              <Checkbox
                value={instancesFlag}
                onChange={(e) => setEntityFlag(SearchEntity.Instances)}
                label="Instances"
              />
              <Checkbox
                value={instanceDomainsFlag}
                onChange={(e) => setEntityFlag(SearchEntity.InstanceDomains)}
                label="Instance Domains"
              />
            </HorizontalGroup>
          </div>
        </VerticalGroup>
      </form>
    );
  }
}

export { SearchEntity, SearchOpt, SearchFormProps, SearchForm };
