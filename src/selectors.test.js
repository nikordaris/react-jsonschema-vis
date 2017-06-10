import {
  getOrdinal,
  hasOrdinal,
  isEditable,
  getComponent,
  hasComponent,
  hasStyle,
  getStyle
} from './selectors';

const mockSchemaWithDefaultPrefix = {
  description: 'description',
  title: 'title',
  meta: {
    vis: {
      ordinal: 0,
      editable: true,
      component: 'Component',
      style: {
        background: 'black'
      }
    }
  }
};
const mockSchemaWithDefaultPrefixNoEdit = {
  description: 'description',
  title: 'title',
  meta: {
    vis: {
      ordinal: 0,
      editable: false,
      component: 'Component',
      style: {
        background: 'black'
      }
    }
  }
};

const customPrefix = 'meta.foobar';
const mockSchemaWithCustomPrefix = {
  description: 'description',
  title: 'title',
  meta: {
    foobar: {
      ordinal: 0,
      editable: true,
      component: 'Component',
      style: {
        background: 'black'
      }
    }
  }
};
const mockSchemaWithCustomPrefixNoEdit = {
  description: 'description',
  title: 'title',
  meta: {
    foobar: {
      ordinal: 0,
      editable: false,
      component: 'Component',
      style: {
        background: 'black'
      }
    }
  }
};

const mockSchemaWithNoPrefix = {
  description: 'description',
  title: 'title',
  ordinal: 0,
  editable: true,
  component: 'Component',
  style: {
    background: 'black'
  }
};
const mockSchemaWithNoPrefixNoEdit = {
  description: 'description',
  title: 'title',
  ordinal: 0,
  editable: false,
  component: 'Component',
  style: {
    background: 'black'
  }
};

const testOrdinal = (data, badData, prefix) => () => {
  it('should have ordinal', () => {
    expect(hasOrdinal(data, prefix)).toBeTruthy();
  });

  it('should not have ordinal', () => {
    expect(hasOrdinal(badData, prefix)).toBeFalsy();
  });

  it('should get ordinal', () => {
    expect(getOrdinal(data, prefix)).toBe(0);
  });

  it('should get default ordinal', () => {
    expect(getOrdinal(badData, prefix, 2)).toBe(2);
  });
};

const testEditable = (data, badData, noEditData, prefix) => () => {
  it('should be editable', () => {
    expect(isEditable(data, prefix)).toBeTruthy();
  });

  it('should not be editable for missing field', () => {
    expect(isEditable(badData, prefix)).toBeFalsy();
  });

  it('should not be editable', () => {
    expect(isEditable(noEditData, prefix)).toBeFalsy();
  });
};

const testComponent = (data, badData, prefix) => () => {
  it('should have Component', () => {
    expect(hasComponent(data, prefix)).toBeTruthy();
  });

  it('should not have Component', () => {
    expect(hasComponent(badData, prefix)).toBeFalsy();
  });

  it('should get Component', () => {
    expect(getComponent(data, prefix)).toBe('Component');
  });

  it('should get default Component', () => {
    expect(getComponent(badData, prefix, 'Component2')).toBe('Component2');
  });
};

const testStyle = (data, badData, prefix) => () => {
  it('should have Style', () => {
    expect(hasStyle(data, prefix)).toBeTruthy();
  });

  it('should not have Style', () => {
    expect(hasStyle(badData, prefix)).toBeFalsy();
  });

  it('should get Style', () => {
    expect(getStyle(data, prefix)).toEqual({ background: 'black' });
  });

  it('should get default Style', () => {
    expect(getStyle(badData, prefix, { background: 'white' })).toEqual({
      background: 'white'
    });
  });
};

describe('Schema with Default Prefix', () => {
  describe(
    'Ordinal Field Selectors',
    testOrdinal(mockSchemaWithDefaultPrefix, mockSchemaWithCustomPrefix)
  );
  describe(
    'Editable Field Selector',
    testEditable(
      mockSchemaWithDefaultPrefix,
      mockSchemaWithCustomPrefix,
      mockSchemaWithDefaultPrefixNoEdit
    )
  );
  describe(
    'Component Field Selectors',
    testComponent(mockSchemaWithDefaultPrefix, mockSchemaWithCustomPrefix)
  );
  describe(
    'Style Field Selectors',
    testStyle(mockSchemaWithDefaultPrefix, mockSchemaWithCustomPrefix)
  );
});

describe('Schema with Custom Prefix', () => {
  describe(
    'Ordinal Field Selectors',
    testOrdinal(
      mockSchemaWithCustomPrefix,
      mockSchemaWithDefaultPrefix,
      customPrefix
    )
  );
  describe(
    'Editable Field Selector',
    testEditable(
      mockSchemaWithCustomPrefix,
      mockSchemaWithDefaultPrefix,
      mockSchemaWithCustomPrefixNoEdit,
      customPrefix
    )
  );
  describe(
    'Component Field Selectors',
    testComponent(
      mockSchemaWithCustomPrefix,
      mockSchemaWithDefaultPrefix,
      customPrefix
    )
  );
  describe(
    'Style Field Selectors',
    testStyle(
      mockSchemaWithCustomPrefix,
      mockSchemaWithDefaultPrefix,
      customPrefix
    )
  );
});

describe('Schema with No Prefix', () => {
  describe(
    'Ordinal Field Selectors',
    testOrdinal(mockSchemaWithNoPrefix, mockSchemaWithDefaultPrefix, null)
  );
  describe(
    'Editable Field Selector',
    testEditable(
      mockSchemaWithNoPrefix,
      mockSchemaWithDefaultPrefix,
      mockSchemaWithNoPrefixNoEdit,
      null
    )
  );
  describe(
    'Component Field Selectors',
    testComponent(mockSchemaWithNoPrefix, mockSchemaWithDefaultPrefix, null)
  );
  describe(
    'Style Field Selectors',
    testStyle(mockSchemaWithNoPrefix, mockSchemaWithDefaultPrefix, null)
  );
});
