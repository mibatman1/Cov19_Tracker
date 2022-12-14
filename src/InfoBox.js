import { Card, CardContent, Typography } from "@material-ui/core";
import './InfoBox.css';
const InfoBox=({title, cases, active, isRed, total, ...props})=>
{
    return(
        <Card className={`infoBox ${active && 'infoBox--selected'} ${isRed && 'infoBox--red'}`} onClick={props.onClick}>
            <CardContent>
                <Typography className="infoBox__title" 
                color="textSecondary">
                    {title}
                </Typography>

                <h2 className="infoBox__cases">{cases}</h2>

                <Typography className="infoBox__total"
                color="textSecondary">
                    {total}
                </Typography>

            </CardContent>

        </Card>
    );
}

export default InfoBox;