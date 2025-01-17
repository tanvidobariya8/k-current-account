import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import Checkbox from "expo-checkbox";
import Button from "@/components/Common/Button";
import { router } from "expo-router";

interface DeclarationCheckboxProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  isSelectAll?: boolean;
}

export const DeclarationCheckbox: React.FC<DeclarationCheckboxProps> = ({
  label,
  value,
  onValueChange,
  isSelectAll = false,
}) => (
  <TouchableOpacity
    style={styles.checkboxContainer}
    onPress={() => onValueChange(!value)}
  >
    <Checkbox
      value={value}
      onValueChange={onValueChange}
      color={value ? "rgb(29 78 216)" : undefined}
    />
    <Text style={[styles.checkboxText, isSelectAll && styles.selectAllText]}>
      {label}
    </Text>
  </TouchableOpacity>
);

interface Declaration {
  key: string;
  label: string;
}

const declarations: Declaration[] = [
  { key: "termsAndConditions", label: "I agree to the Terms and Conditions." },
  {
    key: "privacyPolicy",
    label: "I have read and agree to the Privacy Policy.",
  },
  {
    key: "accurateInformation",
    label:
      "I confirm that all the information provided is accurate and up-to-date.",
  },
  {
    key: "taxCompliance",
    label: "I confirm compliance with applicable tax laws and regulations.",
  },
  {
    key: "antiMoneyLaundering",
    label:
      "I agree to abide by anti-money laundering and anti-terrorism financing regulations.",
  },
  {
    key: "communicationConsent",
    label:
      "I consent to receive communication via email, SMS, or phone calls regarding my account.",
  },
];

export default function CurrentAccountDeclaration(): JSX.Element {
  const [agreedDeclarations, setAgreedDeclarations] = useState<Set<string>>(
    new Set()
  );

  const handleDeclarationChange = useCallback((key: string, value: boolean) => {
    setAgreedDeclarations((prev) => {
      const newSet = new Set(prev);
      if (value) {
        newSet.add(key);
      } else {
        newSet.delete(key);
      }
      return newSet;
    });
  }, []);

  const handleSelectAll = useCallback((value: boolean) => {
    if (value) {
      setAgreedDeclarations(new Set(declarations.map((d) => d.key)));
    } else {
      setAgreedDeclarations(new Set());
    }
  }, []);

  const isAllSelected = useMemo(
    () => agreedDeclarations.size === declarations.length,
    [agreedDeclarations]
  );

  const handleSubmit = useCallback(() => {
    // if (!isAllSelected) {
    //   Alert.alert(
    //     "Error",
    //     "Please agree to all declarations before proceeding."
    //   );
    //   return;
    // }
    // Alert.alert("Success", "Your declaration has been submitted successfully!");

    router.push("/thank-you");
  }, [isAllSelected]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Current Account Declaration</Text>
      <View style={styles.declarationContainer}>
        <DeclarationCheckbox
          label="Select All"
          value={isAllSelected}
          onValueChange={handleSelectAll}
          isSelectAll
        />
        {declarations.map(({ key, label }) => (
          <DeclarationCheckbox
            key={key}
            label={label}
            value={agreedDeclarations.has(key)}
            onValueChange={(value) => handleDeclarationChange(key, value)}
          />
        ))}
      </View>
      <Button
        title="Submit Declaration"
        onPress={handleSubmit}
        disabled={!isAllSelected}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  declarationContainer: {
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkboxText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#333",
  },
  selectAllText: {
    fontWeight: "bold",
  },
});
