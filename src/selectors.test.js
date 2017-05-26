import {
  getOrdinal,
  hasOrdinal,
  isEditable,
  getWidget,
  hasWidget
} from './selectors';

const mockSchemaWithDefaultPrefix = {
  description: 'description',
  title: 'title',
  meta: {
    form: {
      ordinal: 0,
      editable: true,
      widget: 'Widget'
    }
  }
};
const mockSchemaWithDefaultPrefixNoEdit = {
  description: 'description',
  title: 'title',
  meta: {
    form: {
      ordinal: 0,
      editable: false,
      widget: 'Widget'
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
      widget: 'Widget'
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
      widget: 'Widget'
    }
  }
};

const mockSchemaWithNoPrefix = {
  description: 'description',
  title: 'title',
  ordinal: 0,
  editable: true,
  widget: 'Widget'
};
const mockSchemaWithNoPrefixNoEdit = {
  description: 'description',
  title: 'title',
  ordinal: 0,
  editable: false,
  widget: 'Widget'
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

const testWidget = (data, badData, prefix) => () => {
  it('should have Widget', () => {
    expect(hasWidget(data, prefix)).toBeTruthy();
  });

  it('should not have Widget', () => {
    expect(hasWidget(badData, prefix)).toBeFalsy();
  });

  it('should get Widget', () => {
    expect(getWidget(data, prefix)).toBe('Widget');
  });

  it('should get default Widget', () => {
    expect(getWidget(badData, prefix, 'Widget2')).toBe('Widget2');
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
    'Widget Field Selectors',
    testWidget(mockSchemaWithDefaultPrefix, mockSchemaWithCustomPrefix)
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
    'Widget Field Selectors',
    testWidget(
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
    'Widget Field Selectors',
    testWidget(mockSchemaWithNoPrefix, mockSchemaWithDefaultPrefix, null)
  );
});
