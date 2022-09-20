import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import ReactDOM from "react-dom";
import { SeatModel } from "../../Shared/Models/SeatModel";

export const CreateSeat = () => {

    const defaultValues: SeatModel = { floor: 1, col: "", row: "", status: 0 }

    const { register, control, handleSubmit, } = useForm({
        defaultValues: {
            listSeat: [defaultValues]
        }
    });
    const {
        fields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: "listSeat"
    });

    const onSubmit = (data) => {
        const list: SeatModel[] = data.listSeat
        list.map(item => item.floor = Number(item.floor))

        console.log("listSeat", list);
    }



    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <ul>
                {fields.map((item, index) => {
                    return (
                        <li key={item.id}>
                            <input {...register(`listSeat.${index}.floor`, { value: Number() })} type="number" />

                            <input {...register(`listSeat.${index}.col`)} />

                            <input {...register(`listSeat.${index}.row`)} />

                            <button type="button" onClick={() => remove(index)}>
                                Delete
                            </button>
                        </li>
                    );
                })}
            </ul>
            <section>
                <button
                    type="button"
                    onClick={() => {
                        append(defaultValues);
                    }}
                >
                    append
                </button>

            </section>

            <input type="submit" />
        </form>
    );
}
