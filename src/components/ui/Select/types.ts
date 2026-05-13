export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  id?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
}
