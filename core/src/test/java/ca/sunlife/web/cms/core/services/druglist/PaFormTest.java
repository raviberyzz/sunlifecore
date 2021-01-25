package ca.sunlife.web.cms.core.services.druglist;

import acscommons.io.jsonwebtoken.lang.Collections;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class PaFormTest {
    private PaForm subject;

    @Mock
    Row englishRow;

    @Mock
    Row frenchRow;

    @BeforeEach
    public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testNullRows() throws Exception {
        subject = new PaForm(null, null);
        String[] expected = {"English input row is null."};
        assertEquals(Collections.arrayToList(expected), subject.getInvalidReasons());

        subject = new PaForm( englishRow, null);
        assertFalse(subject.isValid());
        String[] expectedFrench = {"French input row is null."};
        assertEquals(Collections.arrayToList(expectedFrench), subject.getInvalidReasons());
    }

    @Test
    public void testToFewColumnsInRows() throws Exception {
        when(englishRow.getLastCellNum()).thenReturn((short) 2);
        subject = new PaForm(englishRow, frenchRow);
        assertFalse(subject.isValid());
        String[] expected1 = {"Wanted at least 4 cells for English. Found 3"};
        assertEquals(Collections.arrayToList(expected1), subject.getInvalidReasons());
        verify(englishRow, atLeastOnce()).getLastCellNum();

        reset(englishRow);
        when(englishRow.getLastCellNum()).thenReturn((short) 3);
        when(frenchRow.getLastCellNum()).thenReturn((short) 2);
        subject = new PaForm(englishRow, frenchRow);
        assertFalse(subject.isValid());
        String[] expected2 = {"Wanted at least 4 cells for French. Found 3"};
        assertEquals(Collections.arrayToList(expected2), subject.getInvalidReasons());
        verify(englishRow, atLeastOnce()).getLastCellNum();
        verify(frenchRow, atLeastOnce()).getLastCellNum();
    }

    @Test
    public void testReadColumnData_Good() throws Exception{
        when(englishRow.getLastCellNum()).thenReturn((short) 3);
        when(frenchRow.getLastCellNum()).thenReturn((short) 3);
        subject = new PaForm(englishRow, frenchRow);
        assertFalse(subject.isValid());
        String[] expected1 = {"English Drug Categories is not defined.",
            "French Drug Categories is not defined.",
            "English Drugs is not defined.",
            "French Drugs is not defined.",
            "English form number is not defined.",
            "Can't generate language-general form number.",
            "French form number is not defined.",
            "DIN is not defined."};
        assertEquals(Collections.arrayToList(expected1), subject.getInvalidReasons());

        when(englishRow.getCell(anyInt())).thenAnswer(mockCells("Anti-depressant",
                "Wellbutrin (bupropion)", "4233-PA-AD-E", "02237823;02237824;"));

        when(frenchRow.getCell(anyInt())).thenAnswer(mockCells("Dépression",
                "Wellbutrin (bupropion)", "4233-PA-AD-F", "02237823;02237824;"));

        subject = new PaForm(englishRow, frenchRow);
        assertTrue(subject.isValid());
    }

    @Test
    public void testReadColumnData_MismatchedFrench() throws Exception {
        when(englishRow.getLastCellNum()).thenReturn((short) 3);
        when(frenchRow.getLastCellNum()).thenReturn((short) 3);
        when(englishRow.getCell(anyInt())).thenAnswer(mockCells("Anti-depressant",
                "Wellbutrin (bupropion)", "4233-PA-AD-E", "02237823;02237824;"));
        when(frenchRow.getCell(anyInt())).thenAnswer(mockCells("Dépression",
                "Wellbutrin (bupropion)", "4001-XX-XX-F", "02237823;02237824;"));

        subject = new PaForm(englishRow, frenchRow);
        assertFalse(subject.isValid());
        String[] expected = {"English form number 4233-PA-AD-E and French form number 4001-XX-XX-F don't match"};
        assertEquals(Collections.arrayToList(expected), subject.getInvalidReasons());

    }

    @Test
    public void testReadColumnData_BadFormFormat() throws Exception {
        when(englishRow.getLastCellNum()).thenReturn((short) 3);
        when(frenchRow.getLastCellNum()).thenReturn((short) 3);
        when(englishRow.getCell(anyInt())).thenAnswer(mockCells("Anti-depressant",
                "Wellbutrin (bupropion)", "4233-PA-AD-X", "02237823;02237824;"));
        when(frenchRow.getCell(anyInt())).thenAnswer(mockCells("Dépression",
                "Wellbutrin (bupropion)", "4001-PA-AD-E", "02237823;02237824;"));

        subject = new PaForm(englishRow, frenchRow);
        assertFalse(subject.isValid());
        String[] expected = {"English Form Number should end with -E but was 4233-PA-AD-X", "French Form Number should end with -F but was 4001-PA-AD-E"};
        assertEquals(Collections.arrayToList(expected), subject.getInvalidReasons());
    }

    @Test
    public void testNumbersOnlyDin() throws Exception {
        when(englishRow.getLastCellNum()).thenReturn((short) 3);
        when(frenchRow.getLastCellNum()).thenReturn((short) 3);
        when(englishRow.getCell(anyInt())).thenAnswer(mockCells("Anti-depressant",
                "Wellbutrin (bupropion)", "4233-PA-AD-E", ".02237823;z02237824z"));
        when(frenchRow.getCell(anyInt())).thenAnswer(mockCells("Dépression",
                "Wellbutrin (bupropion)", "4233-PA-AD-F", "02237823foo;BAR02237824;"));

        subject = new PaForm(englishRow, frenchRow);
        assertTrue(subject.isValid(), subject.getInvalidReasons().toString());
        String[] expected = {"02237823","02237824"};
        assertEquals(Collections.arrayToList(expected), subject.getDins());

    }

    @Test
    public void testLongFormNumber() throws Exception {
        when(englishRow.getLastCellNum()).thenReturn((short) 3);
        when(frenchRow.getLastCellNum()).thenReturn((short) 3);
        when(englishRow.getCell(anyInt())).thenAnswer(mockCells("Biologic response modifier",
                "Entyvio (vedolizumab)", "4233-PA-ETY-E", "02436841;02497876;02497875"));
        when(frenchRow.getCell(anyInt())).thenAnswer(mockCells("Modificateur de la réponse ",
                "Entyvio (védolizumab)", "4233-PA-ETY-F", "02436841;02497876;02497875"));

        subject = new PaForm(englishRow, frenchRow);
        assertTrue(subject.isValid(), subject.getInvalidReasons().toString());
        assertEquals("4233-PA-ETY-E", subject.getFormNumberEn());
        assertEquals("4233-PA-ETY-F", subject.getFormNumberFr());
    }

    @Test
    public void testSpaceAfterFormNumber() throws Exception {
        when(englishRow.getLastCellNum()).thenReturn((short) 3);
        when(frenchRow.getLastCellNum()).thenReturn((short) 3);
        when(englishRow.getCell(anyInt())).thenAnswer(mockCells("Biologic response modifier",
                "Entyvio (vedolizumab)", "4233-PA-ETY-E ", "02436841;02497876;02497875"));
        when(frenchRow.getCell(anyInt())).thenAnswer(mockCells("Modificateur de la réponse ",
                "Entyvio (védolizumab)", "4233-PA-ETY-F ", "02436841;02497876;02497875"));


        subject = new PaForm(englishRow, frenchRow);
        assertTrue(subject.isValid(), subject.getInvalidReasons().toString());
        assertEquals("4233-PA-ETY-E", subject.getFormNumberEn());
        assertEquals("4233-PA-ETY-F", subject.getFormNumberFr());
    }

    private Answer<Cell> mockCells(String categories, String drug, String form, String din) {
        return new Answer<Cell>() {
            @Override
            public Cell answer(InvocationOnMock invocationOnMock) throws Throwable {
                Cell cell = mock(Cell.class);
                when(cell.getCellTypeEnum()).thenReturn(CellType.STRING);
                if (new Integer(0).equals(invocationOnMock.getArgument(0))){
                    when(cell.getStringCellValue()).thenReturn(categories);
                } else if (new Integer(1).equals(invocationOnMock.getArgument(0))){
                    when(cell.getStringCellValue()).thenReturn(drug);
                } else if (new Integer(2).equals(invocationOnMock.getArgument(0))){
                    when(cell.getStringCellValue()).thenReturn(form);
                } else if (new Integer(3).equals(invocationOnMock.getArgument(0))){
                    when(cell.getStringCellValue()).thenReturn(din);
                }
                return cell;
            }
        };
    }
}
