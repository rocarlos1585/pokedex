import {
    formatHeight,
    formatOptionalNumber,
    formatPokemonName,
    formatPokemonNumber,
    formatWeight,
  } from '../../utils/formatters';
  
  describe('formatPokemonName', () => {
    it('capitalizes a simple name', () => {
      const apiNameSimple = 'pikachu';
  
      const resultSimple = formatPokemonName(apiNameSimple);
  
      expect(resultSimple).toBe('Pikachu');
    });
  
    it('replaces hyphens with spaces and capitalizes each word', () => {
      const apiNameHyphen = 'mr-mime';
  
      const resultCaseHyphen = formatPokemonName(apiNameHyphen);
  
       expect(resultCaseHyphen).toBe('Mr Mime');
    });
  
    it('works with stat names that contain hyphens', () => {
      expect(formatPokemonName('special-attack')).toBe('Special Attack');
    });
  });
  
  describe('formatPokemonNumber', () => {
    it('pads numbers with leading zeros up to three digits', () => {
      expect(formatPokemonNumber(1)).toBe('#001');
      expect(formatPokemonNumber(25)).toBe('#025');
    });
  
    it('does not truncate numbers with more than three digits', () => {
      expect(formatPokemonNumber(1025)).toBe('#1025');
    });
  });
  
  describe('formatHeight', () => {
    it('formats meters with one decimal', () => {
      expect(formatHeight(0.4)).toBe('0.4 m');
    });
  
    it('adds a decimal to whole numbers', () => {
      expect(formatHeight(2)).toBe('2.0 m');
    });
  });
  
  describe('formatWeight', () => {
    it('formats kilograms with one decimal', () => {
      expect(formatWeight(6)).toBe('6.0 kg');
    });
  });
  
  describe('formatOptionalNumber', () => {
    it('returns the number as text when it has a value', () => {
      expect(formatOptionalNumber(112)).toBe('112');
    });
  
    it('returns a dash when the value is null', () => {
      expect(formatOptionalNumber(null)).toBe('—');
    });
  });