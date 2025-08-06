import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CompleteAssessment } from '@/data/assessment';

export async function generatePDF(assessment: CompleteAssessment): Promise<void> {
  // Create a temporary div to render the content
  const tempDiv = document.createElement('div');
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  tempDiv.style.top = '0';
  tempDiv.style.width = '800px';
  tempDiv.style.backgroundColor = '#ffffff';
  tempDiv.style.color = '#000000';
  tempDiv.style.padding = '40px';
  tempDiv.style.fontFamily = 'Times New Roman, serif';
  tempDiv.style.fontSize = '12px';
  tempDiv.style.lineHeight = '1.6';
  tempDiv.style.border = '2px solid #000000';

  // Generate HTML content for PDF with medical record format
  tempDiv.innerHTML = `
    <div style="text-align: center; margin-bottom: 30px; border-bottom: 3px solid #000000; padding-bottom: 20px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
        <div style="text-align: left; width: 30%;">
          <div style="border: 2px solid #000000; padding: 10px; text-align: center; font-weight: bold;">
            <div>MEDICAL RECORD</div>
            <div style="font-size: 10px;">CONFIDENTIAL</div>
          </div>
        </div>
        <div style="text-align: center; width: 40%;">
          <h1 style="color: #000000; margin: 0; font-size: 24px; font-weight: bold;">PSYCHOLOGICAL ASSESSMENT REPORT</h1>
          <p style="color: #333333; margin: 5px 0; font-size: 14px;">International Medical Record Format</p>
          <p style="color: #333333; margin: 5px 0; font-size: 12px;">Professional Psychological Evaluation</p>
        </div>
        <div style="text-align: right; width: 30%;">
          <div style="border: 2px solid #000000; padding: 10px; text-align: center; font-weight: bold;">
            <div>RECORD #</div>
            <div style="font-size: 10px;">${Date.now().toString().slice(-6)}</div>
          </div>
        </div>
      </div>
    </div>

    <div style="margin-bottom: 25px;">
      <h2 style="color: #000000; border-bottom: 2px solid #000000; padding-bottom: 8px; font-size: 16px; font-weight: bold;">PATIENT IDENTIFICATION</h2>
      <table style="width: 100%; border-collapse: collapse; border: 1px solid #000000;">
        <tr>
          <td style="padding: 8px; border: 1px solid #000000; width: 25%; font-weight: bold; background-color: #f0f0f0;">Full Name:</td>
          <td style="padding: 8px; border: 1px solid #000000; width: 25%;">${assessment.userInfo.name}</td>
          <td style="padding: 8px; border: 1px solid #000000; width: 25%; font-weight: bold; background-color: #f0f0f0;">Date of Birth:</td>
          <td style="padding: 8px; border: 1px solid #000000; width: 25%;">Age: ${assessment.userInfo.age} years</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #000000; font-weight: bold; background-color: #f0f0f0;">Gender:</td>
          <td style="padding: 8px; border: 1px solid #000000;">${assessment.userInfo.gender}</td>
          <td style="padding: 8px; border: 1px solid #000000; font-weight: bold; background-color: #f0f0f0;">Occupation:</td>
          <td style="padding: 8px; border: 1px solid #000000;">${assessment.userInfo.occupation || 'Not specified'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #000000; font-weight: bold; background-color: #f0f0f0;">Assessment Date:</td>
          <td style="padding: 8px; border: 1px solid #000000;">${assessment.userInfo.assessmentDate}</td>
          <td style="padding: 8px; border: 1px solid #000000; font-weight: bold; background-color: #f0f0f0;">Contact Info:</td>
          <td style="padding: 8px; border: 1px solid #000000;">${assessment.userInfo.contactInfo || 'Not provided'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #000000; font-weight: bold; background-color: #f0f0f0;">Emergency Contact:</td>
          <td style="padding: 8px; border: 1px solid #000000;" colspan="3">${assessment.userInfo.emergencyContact || 'Not provided'}</td>
        </tr>
      </table>
    </div>

    <div style="margin-bottom: 25px;">
      <h2 style="color: #000000; border-bottom: 2px solid #000000; padding-bottom: 8px; font-size: 16px; font-weight: bold;">MEDICAL HISTORY</h2>
      <div style="border: 1px solid #000000; padding: 15px; background-color: #fafafa; min-height: 60px;">
        <p style="margin: 0; line-height: 1.6;">
          ${assessment.userInfo.medicalHistory || 'No medical history provided'}
        </p>
      </div>
    </div>

    <div style="margin-bottom: 25px;">
      <h2 style="color: #000000; border-bottom: 2px solid #000000; padding-bottom: 8px; font-size: 16px; font-weight: bold;">CURRENT MEDICATIONS</h2>
      <div style="border: 1px solid #000000; padding: 15px; background-color: #fafafa; min-height: 60px;">
        <p style="margin: 0; line-height: 1.6;">
          ${assessment.userInfo.currentMedications || 'No medications listed'}
        </p>
      </div>
    </div>

    <div style="margin-bottom: 25px;">
      <h2 style="color: #000000; border-bottom: 2px solid #000000; padding-bottom: 8px; font-size: 16px; font-weight: bold;">OVERALL ASSESSMENT SCORE</h2>
      <div style="text-align: center; padding: 20px; border: 2px solid #000000; background-color: #f0f0f0; border-radius: 5px;">
        <div style="font-size: 36px; font-weight: bold; color: #000000; margin-bottom: 10px;">
          ${assessment.overallScore}%
        </div>
        <p style="color: #333333; margin: 0; font-weight: bold;">Overall Psychological Well-being Score</p>
      </div>
    </div>

    <div style="margin-bottom: 25px;">
      <h2 style="color: #000000; border-bottom: 2px solid #000000; padding-bottom: 8px; font-size: 16px; font-weight: bold;">DETAILED ANALYSIS BY CATEGORY</h2>
      ${assessment.results.map(result => `
        <div style="margin-bottom: 20px; padding: 15px; border: 1px solid #000000; background-color: #fafafa;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <h3 style="margin: 0; color: #000000; text-transform: capitalize; font-size: 14px; font-weight: bold;">${result.category}</h3>
            <span style="padding: 4px 8px; border: 1px solid #000000; border-radius: 3px; font-size: 10px; font-weight: bold; text-transform: uppercase; 
              ${result.severity === 'low' ? 'background-color: #90EE90; color: #000000;' : ''}
              ${result.severity === 'moderate' ? 'background-color: #FFD700; color: #000000;' : ''}
              ${result.severity === 'high' ? 'background-color: #FFA500; color: #000000;' : ''}
              ${result.severity === 'severe' ? 'background-color: #FF6347; color: #ffffff;' : ''}
            ">${result.severity}</span>
          </div>
          <div style="margin-bottom: 10px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px; font-weight: bold;">
              <span>Score: ${result.score}/${result.maxScore}</span>
              <span>${result.percentage}%</span>
            </div>
            <div style="width: 100%; height: 8px; background-color: #e0e0e0; border: 1px solid #000000; border-radius: 2px; overflow: hidden;">
              <div style="width: ${result.percentage}%; height: 100%; background-color: #000000;"></div>
            </div>
          </div>
          <div>
            <p style="font-weight: bold; margin-bottom: 5px; color: #000000;">Recommendations:</p>
            <ul style="margin: 0; padding-left: 20px;">
              ${result.recommendations.map(rec => `<li style="margin-bottom: 3px;">${rec}</li>`).join('')}
            </ul>
          </div>
        </div>
      `).join('')}
    </div>

    <div style="margin-bottom: 25px;">
      <h2 style="color: #000000; border-bottom: 2px solid #000000; padding-bottom: 8px; font-size: 16px; font-weight: bold;">CLINICAL DIAGNOSIS</h2>
      <div style="border: 1px solid #000000; padding: 15px; background-color: #fafafa; min-height: 80px;">
        <p style="margin: 0; line-height: 1.6;">
          ${assessment.diagnosis}
        </p>
      </div>
    </div>

    <div style="margin-bottom: 25px;">
      <h2 style="color: #000000; border-bottom: 2px solid #000000; padding-bottom: 8px; font-size: 16px; font-weight: bold;">DETAILED ANALYSIS</h2>
      <div style="border: 1px solid #000000; padding: 15px; background-color: #fafafa; min-height: 100px;">
        <p style="margin: 0; line-height: 1.6;">
          ${assessment.analysis}
        </p>
      </div>
    </div>

    <div style="margin-bottom: 25px;">
      <h2 style="color: #000000; border-bottom: 2px solid #000000; padding-bottom: 8px; font-size: 16px; font-weight: bold;">GENERAL RECOMMENDATIONS</h2>
      <div style="border: 1px solid #000000; padding: 15px; background-color: #fafafa;">
        <ul style="margin: 0; padding-left: 20px;">
          ${assessment.recommendations.map(rec => `<li style="margin-bottom: 8px;">${rec}</li>`).join('')}
        </ul>
      </div>
    </div>

    <div style="margin-bottom: 25px; padding: 15px; border: 2px solid #FF0000; background-color: #FFF0F0;">
      <h3 style="color: #FF0000; margin: 0 0 10px 0; font-size: 14px; font-weight: bold;">⚠️ IMPORTANT MEDICAL DISCLAIMER</h3>
      <p style="color: #FF0000; margin: 0; line-height: 1.6; font-size: 11px;">
        This assessment is for informational purposes only and should not replace professional medical advice. 
        Please consult with a qualified mental health professional for proper diagnosis and treatment. 
        This document is part of the patient's medical record and should be treated as confidential.
      </p>
    </div>

    <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #000000;">
      <div style="display: flex; justify-content: space-between; align-items: flex-end;">
        <div style="width: 45%;">
          <div style="border-top: 1px solid #000000; padding-top: 10px; margin-top: 50px;">
            <p style="margin: 0; font-weight: bold; text-align: center;">Psychologist Signature</p>
            <div style="height: 60px; border-bottom: 1px solid #000000; margin-top: 10px; position: relative;">
              <div style="position: absolute; bottom: 5px; left: 50%; transform: translateX(-50%); font-weight: bold; font-size: 14px;">
                Fozan Ahmed
              </div>
            </div>
            <p style="margin: 5px 0 0 0; text-align: center; font-size: 10px;">Licensed Psychologist</p>
          </div>
        </div>
        <div style="width: 45%; text-align: right;">
          <div style="border: 2px solid #000000; padding: 10px; display: inline-block; margin-top: 20px;">
            <div style="text-align: center; font-weight: bold; font-size: 12px;">
              <div style="border: 1px solid #000000; padding: 5px; margin-bottom: 5px;">
                OFFICIAL STAMP
              </div>
              <div style="font-size: 10px;">PsychAid Medical Records</div>
              <div style="font-size: 8px;">Date: ${new Date().toLocaleDateString()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div style="text-align: center; margin-top: 30px; padding-top: 15px; border-top: 1px solid #000000;">
      <p style="color: #333333; margin: 0; font-size: 10px;">
        Report generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
      </p>
      <p style="color: #333333; margin: 5px 0 0 0; font-size: 10px;">
        PsychAid - Professional Psychological Assessment Tool | International Medical Record Format
      </p>
    </div>
  `;

  document.body.appendChild(tempDiv);

  try {
    const canvas = await html2canvas(tempDiv, {
      backgroundColor: '#ffffff',
      scale: 2,
      width: 800,
      height: tempDiv.scrollHeight,
      useCORS: true,
      allowTaint: true
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Generate filename with medical record format
    const filename = `Medical_Record_${assessment.userInfo.name.replace(/\s+/g, '_')}_${assessment.userInfo.assessmentDate.replace(/\//g, '-')}.pdf`;
    pdf.save(filename);

  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  } finally {
    document.body.removeChild(tempDiv);
  }
} 